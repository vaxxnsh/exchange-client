import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center">
                <Image 
                    src={`/logos/logo.svg`}
                    width={17}
                    height={17} 
                    alt='backpack'
                />
              </div>
              <Image 
                    src={`/logos/backpack.svg`}
                    width={90}
                    height={90} 
                    className='mt-1'
                    alt='backpack'
                />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Backpack Exchange © 2025</span>
              <Link href="#" className="hover:text-white transition-colors">
                Legal
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>

          {/* Center section - Navigation links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-white">Company</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link href="#" className="hover:text-white transition-colors">
                  About
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-white">Help & Support</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link href="#" className="hover:text-white transition-colors">
                  Learn
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Guide
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Support
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Documentation
                </Link>
              </div>
            </div>
          </div>

          {/* Right section - Social media icons */}
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Image 
                    src={`/icons/x-bw.svg`}
                    width={20}
                    height={20} 
                    className='mt-1'
                    alt='backpack'
              />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Image 
                    src={`/icons/discord-bw.svg`}
                    width={20}
                    height={20} 
                    className='mt-1'
                    alt='backpack'
              />
              <span className="sr-only">Discord</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Image 
                    src={`/icons/linkedin2.svg`}
                    width={20}
                    height={20} 
                    className='mt-1'
                    alt='backpack'
              />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Image 
                    src={`/icons/reddit.svg`}
                    width={20}
                    height={20} 
                    className='mt-1'
                    alt='backpack'
              />
              <span className="sr-only">Reddit</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
