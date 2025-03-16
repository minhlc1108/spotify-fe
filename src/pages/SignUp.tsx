import React, { useState } from "react";
import Spotify from "@components/icons/icon-spotify";
import Google from "@components/icons/icon-google";
import Facebook from "@components/icons/icon-facebook";
import Apple from "@components/icons/icon-apple";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <div className="w-full max-w-md p-8 bg-black rounded-lg">
        <div className="flex justify-center mb-8">
          <Spotify fontSize={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-8">
          Đăng ký để bắt đầu nghe
        </h1>
        
        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Địa chỉ email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            className="w-full p-3 bg-[#121212] border border-gray-700 rounded text-white focus:outline-none focus:border-white"
          />
        </div>
        
        {/* Phone number link */}
        <div className="mb-6 text-center">
          <Link to="/signup-phone" className="text-[#1ed760] hover:underline">
            Dùng số điện thoại
          </Link>
        </div>
        
        {/* Continue button */}
        <button className="w-full py-3 bg-[#1ed760] hover:bg-[#1fdf64] text-black font-bold rounded-full transition-colors mb-8">
          Tiếp theo
        </button>
        
        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">hoặc</span>
          </div>
        </div>
        
        {/* Social signup buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-gray-700 text-white hover:border-white transition-colors">
            <Google fontSize={20} />
            <span>Đăng ký bằng Google</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-gray-700 text-white hover:border-white transition-colors">
            <Facebook fontSize={20} />
            <span>Đăng ký bằng Facebook</span>
          </button>
          
          <button className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border border-gray-700 text-white hover:border-white transition-colors">
            <Apple fontSize={20} className="text-white" />
            <span>Đăng ký bằng Apple</span>
          </button>
        </div>
        
        {/* Login link */}
        <div className="text-center text-gray-400">
          <span>Bạn đã có tài khoản? </span>
          <Link to="/login" className="text-white hover:underline">Đăng nhập tại đây</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 