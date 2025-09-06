
import React from 'react';

export const Illustration: React.FC = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative scale-90 md:scale-100">
            {/* Paper plane */}
            <div className="absolute -top-8 -right-20 text-white transform -rotate-12 animate-blob animation-delay-2000">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.25,12,3.25,2.75,8.5,12,3.25,21.25Z" fill="currentColor" stroke="#0A252C" strokeWidth="1" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Document with signature */}
            <div className="relative w-64 h-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl transform rotate-3 transition-transform hover:rotate-0 hover:scale-105 duration-300">
                <div className="absolute top-4 left-4 right-4 h-1.5 bg-slate-200 rounded-full"></div>
                <div className="absolute top-9 left-4 right-12 h-1.5 bg-slate-200 rounded-full"></div>
                <div className="absolute top-14 left-4 right-8 h-1.5 bg-slate-200 rounded-full"></div>
                <div className="absolute top-24 left-4 right-4 h-12 border-2 border-slate-300 rounded"></div>
                
                {/* Signature */}
                <svg viewBox="0 0 200 60" className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-16 text-red-500">
                    <path d="M 10 40 C 20 20, 40 20, 50 40 S 70 60, 80 40 C 90 20, 110 20, 120 40 S 140 60, 150 40" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 140 30 C 150 50, 170 50, 180 30" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>

            {/* Decorative shapes */}
            <div className="absolute -bottom-10 -left-16 w-32 h-24 bg-pink-400/50 rounded-full transform -rotate-45 filter blur-xl animate-blob"></div>
            <div className="absolute top-1/2 -right-16 w-24 h-20 bg-yellow-400/50 rounded-tl-full rounded-tr-full rounded-br-full transform rotate-12 filter blur-lg animate-blob animation-delay-4000"></div>
            <div className="absolute top-10 -left-12 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 -right-10 w-3 h-3 bg-white rounded-full animate-pulse animation-delay-2000"></div>
        </div>
    </div>
);
