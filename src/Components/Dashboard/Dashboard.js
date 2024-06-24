import React from 'react'
import Navbar from '../Navbar/Navbar'
import "./Dashboard.css"
import robo1 from '../Assests/robo1.png'
import {motion} from "framer-motion"

function Dashboard() {
  return (
    <div className='dash_body'>
        <Navbar/>
        <div className='dash_main'>
        <div className='dash_right'>
            <motion.h1 className='dash_title'  
              initial={{opacity:0, y:50}}
              animate={{opacity:1, y:1}}
              transition={{duration : 0.3}}>AI Fusion</motion.h1>
            <p className='dash_info'> Your all-in-one AI companion. Whether you need concise summaries, 
              precise code generation, intelligent image reading, or engaging chat interactions, 
              AI Fusion is here to enhance your digital experience. Seamlessly bridging languages, 
              mediums, and the breadth of human creativity, our app stands ready to illuminate, inspire, and connect. 
              Welcome to the future of intelligent assistance. Welcome to AI Fusion. </p>
            {/* <button className='dash_btn'>Explore</button> */}
            
        </div>

        <div className='dash_Image'>
            {/* <img  src={robo1} alt='Dashboard' /> */}

            <motion.img 
                initial={{x:-100}}
                animate={{x:50}}
                transition={{type:"smooth",repeatType:"mirror", duration : 2 , repeat:Infinity}}

           src={robo1}/>
            {/* <div class="scrollable-container">
            <div className='dash_card'>
            </div>
            <div className='dash_card'></div>
            <div className='dash_card'></div>
            <div className='dash_card'></div>
            <div className='dash_card'></div>
            </div> */}
           

        </div>

        </div>
    </div>
  )
}

export default Dashboard