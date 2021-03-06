// import '../shared/Add.css';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {Grid, Input, Text, Button} from '../elements/index';
import {actionCreators as imageActions} from '../redux/modules/image';
import {actionCreators as postActions} from '../redux/modules/post';
import {getCookie} from '../shared/Cookie';

function Add(){
    const history = useHistory();
    const dispatch = useDispatch();
    const fileInput = useRef(null);
    const [getInputs, setInputs] = useState({
        text : '',
        option : '',
    });
    const cookie = getCookie("is_login");
    
    const changePreview = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            dispatch(imageActions.uploadImageDB(reader.result))
        }
    }
    const preview = useSelector(state => state.image.preview)
    
    const {text, option} = getInputs;
    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...getInputs,
            [name]: value
        })
    }

    const formData = new FormData();
        if(fileInput.current){
            formData.append('articleThumb', fileInput.current.files[0])
            formData.append('articleDesc', getInputs.text)
            formData.append('articleKind', getInputs.option)
            // for (var pair of formData.entries()){
            //     console.log(pair);
            //  }
        }
    
    const textRef = useRef(null); 

    const submit = () => {
        if (!textRef.current.value || !fileInput) {
            window.alert("내용을 입력해주세요!");
        } else {
            dispatch(postActions.addPostDB(formData, cookie))
            history.replace("/");
        }
    }
    
    return(
        <>
        <Grid center width='60%' margin='0 auto' >
            <Grid>
                <Text size='30px' bold='30'>게시물 작성</Text>
            </Grid>
            <Grid width='50%' margin='-10% 5% -13%'>
                <Select name='option' value={option} onChange={onChange}>
                    <option>category</option>
                    <option>운동</option>
                    <option>음악</option>
                    <option>영화</option>
                    <option>게임</option>
                </Select>
            </Grid>
            <Grid margin='10% 0 0 0'>
                <img style={{borderRadius:'20px', width:'50%', margin:'10px'}} src={preview? preview : "http://via.placeholder.com/400x300"}/>
            </Grid>
            <Grid margin='2% -14% 2%'>
                <Label for='file'>업로드</Label>
                <input style={{fontSize:'15px', width:'1px'}} accept='image/*' type='file' ref={fileInput} onChange={changePreview} id='file' />
            </Grid>
            <Grid>
                <TextArea name='text' value={text} onChange={onChange} ref={textRef} />
            </Grid>
            <Grid margin='5% 0 5% 0'>
                <Button width='50%' _onClick={submit}>저장하기</Button>
            </Grid>
        </Grid>
        </>
    )
}

export const Select = styled.select`
    width:130px;
    height:30px;
    margin-top: 20%;
    margin-bottom: 10%;
    margin-left: 15px;
    border: none;
    background-color : #eee;
    border-radius:10px;
    font-size:16px;
`
export const TextArea = styled.input`
    resize: none;
    width: 48%;
    height: 200px;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    font-size : 20px;
`
export const Label = styled.label`
    border:0.3px solid gray;
    border-radius:10px;
    padding:5px;
    width:40px;
    height:20px;
    font-size:20px;
`

export default Add