import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { Menu } from 'lucide-react';
import React, { useState } from 'react';


function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    //Desktop View
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 text-teal" />
          <span className='font-extrabold md:text-xl text-[14px]'>
            <span className='text-gold'>DECENTRA</span>
            <span className='text-teal'>TEACH</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}
          className='bg-gold hover:bg-teal text-white font-semibold py-2 px-4 rounded'>Sign Out</Button>
        </div>
      </div>

     
       {/*Mobile View, Mobile Menu */}
       <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={() => {
                navigate('/courses');
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Explore Courses
            </button>
            <button
            
              onClick={() => {
                navigate("/student-courses")
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Courses
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

    </header>
  );
}

export default StudentViewCommonHeader;
