import React, { useState } from "react";
import Spotify from "@components/icons/icon-spotify";
import Google from "@components/icons/icon-google";
import Facebook from "@components/icons/icon-facebook";
import Apple from "@components/icons/icon-apple";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <div className="w-full max-w-md p-8 bg-black rounded-lg">
        <div className="flex justify-center mb-8">
          <Spotify fontSize={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          Đăng nhập vào Spotify
        </h1>
        
        {/* Social login buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-gray-700 text-white hover:border-white transition-colors">
            <Google fontSize={20} />
            <span>Tiếp tục bằng Google</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-gray-700 text-white hover:border-white transition-colors">
            <Facebook fontSize={20} />
            <span>Tiếp tục bằng Facebook</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-gray-700 text-white hover:border-white transition-colors">
            <Apple fontSize={20} className="text-white" />
            <span>Tiếp tục bằng Apple</span>
          </button>
          
          <button className="flex items-center justify-center w-full py-3 px-4 rounded-full border border-gray-700 text-white hover:border-white transition-colors">
            <span>Tiếp tục bằng số điện thoại</span>
          </button>
        </div>
        
        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Email hoặc tên người dùng</span>
          </div>
        </div>
        
        {/* Email input */}
        <div className="mb-6">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email hoặc tên người dùng"
            className="w-full p-3 bg-[#121212] border border-gray-700 rounded text-white focus:outline-none focus:border-white"
          />
        </div>
        
        {/* Continue button */}
        <button className="w-full py-3 bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold rounded-full transition-colors mb-8">
          Tiếp tục
        </button>
        
        {/* Sign up link */}
        <div className="text-center text-gray-400">
          <span>Bạn chưa có tài khoản? </span>
          <Link to="/register" className="text-white hover:underline">Đăng ký Spotify</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 
