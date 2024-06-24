import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Code.css';
import Navbar from '../Navbar/Navbar';
import Loader from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Code() {
    const [aCode, setaCode] = useState('');
    const [effectcode, setEffectcode] = useState('');
    const [quesInput, setQuesInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(() => {
        if (aCode.length > 0) {
            const typingEffectInterval = setInterval(() => {
                if (aCode.length > effectcode.length) {
                    setEffectcode((prevContent) => aCode.slice(0, prevContent.length + 1));
                } else {
                    clearInterval(typingEffectInterval);
                }
            }, 30);
            return () => clearInterval(typingEffectInterval);
        }
    }, [aCode, effectcode]);

    async function handleCode() {
        try {
            if (quesInput === '') {
                return toast.error('Please enter question');
            }
            if (language === '') {
                return toast.error('Please select language');
            }
            setLoading(true);
            setaCode("");
            setEffectcode("");
            const res = await axios.post('https://ai-tool-server.onrender.com/ai/code', { quesInput, language });
            setaCode(res.data.ansCode);
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    function renderCodeLines() {
        return (effectcode || '').split('\n').map((line, index) => (
            <div key={index} className="code_line">{line}</div>
        ));
    }

    return (
        <div className='code_body'>
            <Navbar />
            <div className='code_main'>
                <div className='code_ques'>
                    <textarea
                        className='code_text'
                        placeholder='write your question...'
                        value={quesInput}
                        onChange={(e) => setQuesInput(e.target.value)}
                    />
                    <div className='code_btns_div'>
                        <select className='code_Select' value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="">Select Language</option>
                            <option value="javascript">JavaScript</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="c">C</option>
                            <option value="c++">C++</option>
                        </select>
                        <button className='code_btn' onClick={handleCode}>Get Code</button>
                    </div>
                </div>
                <div className='code_div'>
                    <div className='code_inner'>
                        {loading ? (<Loader color="secondary" className='loader' />) : (renderCodeLines())}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Code;
