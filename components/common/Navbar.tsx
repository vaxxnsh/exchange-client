import { navLinks } from '@/utils/constants';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import Search from './Search';



const Navbar = () => {
    const isSignIn = false;

  return (
    <header className="w-full flex h-14 sticky bg-background items-center px-5">
        <nav className="flex w-full items-center justify-between">
            <div className='flex space-x-12'>
                <div className='center space-x-3'>
                    <Image 
                        src={`/logos/logo.svg`}
                        width={17}
                        height={17} 
                        alt='backpack'
                    />

                    <Image 
                        src={`/logos/backpack.svg`}
                        width={90}
                        height={90} 
                        className='mt-1'
                        alt='backpack'
                    />
                </div>
                <div className='flex items-center text-genGray space-x-8'>
                    {navLinks.map((link,index) => {
                        

                        const linkStyle = `flex text-[16px] font-semibold items-center hover:text-amber-50`
                        return link.type == 'link' ? 
                        (
                            <Link 
                                key={index}
                                href={link.redirect}
                                className={linkStyle}
                            >
                                {link.title}
                            </Link>
                        )
                        :
                        (
                            /* TODO: Add Dropdown here */
                            <div 
                                key={index}
                                className={linkStyle}
                            >
                                <p>{link.title}</p>
                                <ChevronDown
                                    size={20}
                                    className='mx-0.5'
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>
                <Search/>
            </div>

            <div className='flex items-center'>
                {
                    isSignIn ?

                        <div>
                            {/* Todo : Implement SignIn Logic */}
                        </div>
                        :
                        <div className='flex items-center space-x-4'>
                            <Button className='bg-[#0c2c24] text-[#00bb6a] text-[15px]'>
                                Sign Up
                            </Button>
                            <Button className='bg-[#18253a] text-[#4b92fd] text-[15px]'>
                                Sign In
                            </Button>
                        </div>
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar