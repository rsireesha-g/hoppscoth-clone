import React, { useRef, useState } from 'react'
import { Link } from 'react-router'
import { FaGithubSquare } from "react-icons/fa";
import googleSvg from "../assests/icons/google.svg"
import microsoftsvg from "../assests/icons/microsoft.svg";
import emailsvg from "../assests/icons/email.svg";
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { onLogin, onLoginModalClick } from '../redux/slices/statesSlice';
import { Button } from './button';
import { IoIosArrowDropleft } from 'react-icons/io';
import { Modal } from './modal';

export const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);
    const isLoginModalOpen = useSelector((state: RootState) => state.statesStatus.isLoginModalOpen);


    return (
        <Modal onClose={() => dispatch(onLoginModalClick(false))} isOpen={isLoginModalOpen} >
            <div className="innerModal top-12 left-[35%]" ref={modalRef}>
                <div className="flex items-center justify-between p-2 ">
                    <h3 className="ml-4 heading text-center flex-grow">Login to Hoppscotch</h3>
                    <MdOutlineClose
                        size={20}
                        onClick={() => dispatch(onLoginModalClick(false))}
                        className='cursor-pointer' />
                </div >
                {step === 1 ?
                    <div className='overflow-y-auto'>

                        <div className="flex flex-col gap-2 justify-start border-y-dividerDark border-y p-4 text-secondaryLight hover:text-secondary">
                            <div className="flex gap-3 p-2 align-middle justify-start hover:bg-primary hover:text-secondaryDark cursor-not-allowed">
                                <FaGithubSquare size={16} />
                                <p>Continue with Github</p>
                            </div>
                            <div className="flex gap-3 p-2 align-middle justify-start hover:bg-secondaryLight hover:text-secondaryDark cursor-not-allowed">
                                <div className='w-4 h-4 flex align-middle justify-center bg-white'>
                                    <img src={googleSvg} width={12} height={12} alt='google' />
                                </div>
                                <p>Continue with Google</p>
                            </div>
                            <div className="flex gap-3 p-2 align-middle justify-start hover:bg-primary hover:text-secondaryDark cursor-not-allowed">
                                <div className='w-4 h-4 flex align-middle justify-center bg-white'>
                                    <img src={microsoftsvg} width={12} height={12} alt='google' />
                                </div>
                                <p>Continue with Microsoft</p>
                            </div>
                            <div className="flex gap-3 p-2 align-middle justify-start hover:bg-primary hover:text-secondaryDark cursor-pointer"
                                onClick={() => setStep(2)}>
                                <div className='w-4 h-4 flex align-middle justify-center bg-[#258872]'>
                                    <img src={emailsvg} width={12} height={12} alt='google' className='text-white' />
                                </div>
                                <p>Continue with email</p>
                            </div>
                        </div>

                        <div className="bottom text-[10px] p-2 pb-0 text-secondaryLight">
                            By signing in, you are agreeing to our  <Link target="_blank" to="https://docs.hoppscotch.io/support/terms" className='text-accentDark'>Terms of Services</Link> and <Link target="_blank" to="https://docs.hoppscotch.io/support/privacy" className='text-accentDark'>Privacy Policy</Link>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="flex flex-col gap-2 justify-start border-y-dividerDark border-y p-4 text-secondaryLight">
                            <div className="relative text-secondaryLight hover:text-secondaryDark bg-none border-0 flex flex-col gap-2">
                                {email !== '' && <p className='absolute z-20 -top-2 left-2 text-[10px]'>Email</p>}
                                <input className='w-full p-2 bg-transparent border-dividerDark border'
                                    type='email' required placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)} />
                                <Button type='primary' text='Send a magic link' onClick={() => {
                                    if (email) {
                                        localStorage.setItem('email', email);
                                        dispatch(onLogin())
                                    }
                                    else alert('please enter email')
                                }} />
                            </div>
                        </div>
                        <div className="bottom text-xs p-2 pb-0 text-secondaryLight"
                            onClick={() => setStep(1)}
                        ><IoIosArrowDropleft size={16} className='pr-4' /> All sign in options</div>
                    </div>
                }
            </div>
        </Modal>
    )
}
