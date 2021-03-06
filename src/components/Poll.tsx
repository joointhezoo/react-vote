import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {addPoll, modifyPoll} from 'ducks';
import Modal from 'components/base/Modal';
import Button from 'components/base/Button';
import Delete from 'components/svg/Delete';
import {selectedPollSelector} from 'selectors';
import {getEpochTime} from 'utils';
import {red1, black1} from 'styles/colors';

const Input = styled.input({
  width: 'calc(100% - 16px)',
  border: '1px solid #ddd',
  padding: '8px',
  borderRadius: '4px',
  color: black1,
  transition: 'all 0.3s ease',
  margin: '8px 0 0'
});

const Title = styled.p({
  color: black1,
  fontSize: '24px',
  fontWeight: 700,
  margin: '16px 0'
});

const Label = styled.label({
  margin: '8px 0 0',
  color: black1,
  fontSize: '14px',
  fontWeight: 700,
  display: 'flex',
  justifyContent: 'space-between',
  '& svg': {
    cursor: 'pointer'
  }
});
const Warning = styled.label({
  color: red1,
  fontSize: '12px',
  margin: '4px 0',
});
interface Props {
  onClose: () => void;
}
export default ({onClose}: Props) => {
  const dispatch = useDispatch();
  const selectedPoll = useSelector(selectedPollSelector);
  const {register, handleSubmit, setValue, getValues, errors} = useForm();
  const [options, setOptions] = useState(selectedPoll ?
    selectedPoll.options.flatMap(({title}) => ({title})) :
    [{title: ""}, {title: ""}, {title: ""}]);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (msg) setTimeout(() => setMsg(null), 2000);
  }, [msg]);

  useEffect(() => {
    if (selectedPoll) {
      const {question, startDate, endDate, options} = selectedPoll;
      setValue('question', question);
      setValue('startDate', startDate);
      setValue('endDate', endDate);
      options.forEach(({title}, i) => {
        setValue(`option${i+1}`, title);
      })
    }
  }, [selectedPoll, setValue]);

  const onSubmit = handleSubmit((value) => {
    const options = Object.keys(value)
      .filter(val => val.startsWith('option'))
      .map((key, index) => ({
        title: value[key],
        voter: selectedPoll ? selectedPoll.options[index]?.voter|| [] : []
      }));
    const {question, startDate, endDate} = value;
    const data = {
      question,
      options,
      startDate: getEpochTime(startDate),
      endDate: getEpochTime(endDate)
    };
    selectedPoll ?
      dispatch(modifyPoll({...data, id: selectedPoll.id})) :
      dispatch(addPoll(data));
  });

  const _addOptions = () => setOptions([...options, {title: ""}]);

  const _deleteOptions = (i: number) => {
    if (options.length > 3) {
      const removeItem = options.filter((_, index) => index !== i);
      setOptions(removeItem);
    } else {
      setMsg('unless 3 options you need');
    }
  };

  return (
    <Modal onClose={onClose}>
      <div css={css`display: flex; flex-direction: column; width: 100%;`}>
        <Title>{selectedPoll? 'Modify' : 'Add'} Your Poll</Title>
        <form onSubmit={onSubmit}>
          <Label>Question</Label>
          <Input
            name="question"
            placeholder="write your question"
            ref={register({
              validate: value => value !== ""
            })}
          />
          {errors.question && <Warning>question is required</Warning>}
          <div css={css`display: flex; justify-content: space-between;`}>
            <div css={css`width: 49%;`}>
              <Label>Start Date</Label>
              <Input
                name="startDate"
                placeholder="YYYY-MM-DD HH:MM"
                ref={register({
                  validate: value => value !== "",
                })}
              />
              {errors.startDate && <Warning>required start Date</Warning>}
            </div>
            <div css={css`width: 49%;`}>
              <Label>End Date</Label>
              <Input
                name="endDate"
                placeholder="YYYY-MM-DD HH:MM"
                ref={register({
                  validate: {
                    required: value => value !== "",
                    wrongDate: value => getEpochTime(getValues("startDate")) < getEpochTime(value)
                  }
                })}
              />
              {errors.endDate?.type === 'required' && <Warning>required End Date</Warning>}
              {errors.endDate?.type === 'wrongDate' && <Warning>can be earlier than start date</Warning>}
            </div>
          </div>
          {options.map((_, i) => {
            return (
              <Fragment key={`new-option-${i}`}>
                <Label>Option{i+1}<Delete onClick={() => _deleteOptions(i)}/></Label>
                <Input name={`option${i+1}`} ref={register({
                  validate: value => value !== ""
                })}/>
                {errors[`option${i+1}`] && <Warning>fill in option</Warning>}
              </Fragment>
            )
          })}
          <div css={css`
            display: flex;
            flex-direction: column;
            margin: 24px 0 0;
          `}>
            <Button theme="line" type="button" onClick={() => _addOptions()}>Add more Options</Button>
            {!!msg && <Warning>{msg}</Warning>}
            <Button type="submit">{selectedPoll ? 'Modify' : 'Create'}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};