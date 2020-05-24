import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {addPoll} from 'ducks';
import Modal from 'components/base/Modal';
import Button from 'components/base/Button';
import Delete from 'components/svg/Delete';
import {selectedPollSelector} from 'selectors';

const Input = styled.input({
  width: 'calc(100% - 16px)',
  border: '1px solid #ddd',
  padding: '8px',
  borderRadius: '4px',
  color: '#020202',
  transition: 'all 0.3s ease',
  margin: '8px 0'
});

const Title = styled.p({
  color: '#020202',
  fontSize: '24px',
  fontWeight: 700,
  marginBottom: '16px'
});

const Label = styled.label({
  color: '#020202',
  fontSize: '14px',
  fontWeight: 700,
  display: 'flex',
  justifyContent: 'space-between',
  '& svg': {
    cursor: 'pointer'
  }
});
const Warning = styled.label({
  color: '#f44336',
  fontSize: '12px',
  margin: '8px 0 4px',
});
interface Props {
  onClose: () => void;
}
export default ({onClose}: Props) => {
  const dispatch = useDispatch();
  const selectedPoll = useSelector(selectedPollSelector);
  const {register, handleSubmit, setValue} = useForm();
  const [options, setOptions] = useState(selectedPoll ?
    selectedPoll.options.flatMap(({title}) => ({title})) :
    [{title: ""}, {title: ""}, {title: ""}]);

  useEffect(() => {
    if (selectedPoll) {
      setValue('question', selectedPoll.question);
      selectedPoll.options.forEach(({title}, i) => {
        setValue(`option${i+1}`, title);
      })
    }
  }, [selectedPoll]);

  const onSubmit = handleSubmit((value) => {
    const optionsKey = Object.keys(value).filter(val => val.startsWith('option'));
    const options = optionsKey.map((key) => ({title: value[key], voter: []}));
    const {question, startDate, endDate} = value;
    dispatch(addPoll({
      question,
      options,
      startDate,
      endDate
    }));
  });

  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg(null)
      }, 2000)
    }
  }, [msg]);

  const _addOptions = () => {
    setOptions([...options, {title: ""}])
  };
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
          <Input name="question" ref={register} placeholder="write your question"/>
          <div css={css`display: flex; justify-content: space-between;`}>
            <div css={css`width: 49%;`}>
              <Label>Start Date</Label>
              <Input name="startDate" ref={register} placeholder="YYYY-MM-DD HH:MM"/>
            </div>
            <div css={css`width: 49%;`}>
              <Label>End Date</Label>
              <Input name="endDate" ref={register} placeholder="YYYY-MM-DD HH:MM"/>
            </div>
          </div>
          {options.map((_, i) => {
            return (
              <>
                <Label>Option{i+1}<Delete onClick={() => _deleteOptions(i)}/></Label>
                <Input name={`option${i+1}`} ref={register}/>
              </>
            )
          })}
          <div css={css`display: flex; flex-direction: column`}>
            <Button theme="line" type="button" onClick={() => _addOptions()}>Add more Options</Button>
            {!!msg && <Warning>{msg}</Warning>}
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};