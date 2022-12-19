import React from 'react';
import ReactQuill from 'react-quill';
import {Box} from '@mui/material';
import '../scss/QuillEditor.scss';

function QuillEditor(props) {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, {'indent': '-1'}, {'indent': '+1'}, 'link'],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
            [{'direction' : 'rtl'}],
            ['image', 'video', 'link'],
            ['clean']  
        ],
    };
    

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]


    const onChangeContents = (text) => {
        props.setContents(text);
    }

    return (
        <Box>
            <ReactQuill 
                className='write-editor'
                value={props.contents}
                onChange={onChangeContents}
                modules={modules}
                formats={formats}
            />
        </Box>
    )
}

export default QuillEditor;