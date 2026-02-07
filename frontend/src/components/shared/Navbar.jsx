import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion' // 1. Framer Motion Import

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    // Common Nav Link with Animation Logic
    const NavItem = ({ to, children }) => (
        <li className='relative group'>
            <Link to={to} className='hover:text-[#6A38C2] transition-colors duration-300'>
                {children}
            </Link>
            {/* 2. Animated Underline on Hover */}
            <motion.div 
                className='absolute bottom-[-4px] left-0 h-[2px] bg-[#6A38C2]'
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        </li>
    );

    return (
        <div className='bg-white border-b border-gray-100 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className='text-2xl font-bold cursor-pointer' onClick={() => navigate("/")}>
                        Job<span className='text-[#F83002]'>Portal</span>
                    </h1>
                </motion.div>
                
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <NavItem to="/admin/companies">Companies</NavItem>
                                    <NavItem to="/admin/jobs">Jobs</NavItem>
                                </>
                            ) : (
                                <>
                                    <NavItem to="/">Home</NavItem>
                                    <NavItem to="/jobs">Jobs</NavItem>
                                    <NavItem to="/browse">Browse</NavItem>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Avatar className="cursor-pointer border-2 border-transparent hover:border-[#6A38C2] transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                        </Avatar>
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 shadow-xl border-gray-100">
                                    <div className=''>
                                        <div className='flex gap-3 items-center'>
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-bold text-lg'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground line-clamp-1'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-4 space-y-2 border-t pt-4'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors'>
                                                        <User2 className='text-gray-600' size={20}/>
                                                        <Link to="/profile" className='text-sm font-medium text-gray-700'>View Profile</Link>
                                                    </div>
                                                )
                                            }
                                            <div onClick={logoutHandler} className='flex items-center gap-3 p-2 hover:bg-red-50 rounded-md cursor-pointer transition-colors group'>
                                                <LogOut className='text-gray-600 group-hover:text-red-600' size={20}/>
                                                <span className='text-sm font-medium text-gray-700 group-hover:text-red-600'>Logout</span>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar