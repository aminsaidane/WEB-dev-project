import { PawPrint } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <div>
       <footer className="bg-[#2C3E50] text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-[#1ABC9C]" />
              <span className="text-sm">© 2025 PawsCare. All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-[#1ABC9C] transition-colors">About</a>
              <a href="#" className="hover:text-[#1ABC9C] transition-colors">Contact</a>
              <a href="#" className="hover:text-[#1ABC9C] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#1ABC9C] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
