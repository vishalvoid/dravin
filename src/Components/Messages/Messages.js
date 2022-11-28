import React from 'react'
import './Messages.css'
import avatar from '../Img/sideBar/avatar.jpg'

export default function Messages() {
    return (
        <div className="container-msg">
            <div className="user-tab">
                <div className="user-header">
                    <p>Messages</p>
                    <i class="bi bi-gear-fill"></i>
                </div>
                <div className="search-bar">
                    <input className='search-bar-component' type="text" placeholder='Search' />
                    <i class="bi bi-search"></i>
                </div>
                <div className="user-name">
                    <div className="dp">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="content">
                        <p className='Name'>Dillin Nair</p>
                        <p className='R-msg'>Rescent Message</p>
                    </div>
                </div>
                <div className="user-name">
                    <div className="dp">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="content">
                        <p className='Name'>Dillin Nair</p>
                        <p className='R-msg'>Rescent Message</p>
                    </div>
                </div>
                <div className="user-name">
                    <div className="dp">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="content">
                        <p className='Name'>Dillin Nair</p>
                        <p className='R-msg'>Rescent Message</p>
                    </div>
                </div>
                <div className="user-name">
                    <div className="dp">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="content">
                        <p className='Name'>Dillin Nair</p>
                        <p className='R-msg'>Recent Message</p>
                    </div>
                </div>
            </div>
            <div className="chat-tab">
                <div className="friend-header">
                    <div className="friend-header-img">
                        <img src="" alt="" />
                    </div>
                    <div className="friend-header-name">Dillin Nair</div>
                </div>
                <div className='type-section'>
                    sagar
                </div>
            </div>

        </div>
    )
}
