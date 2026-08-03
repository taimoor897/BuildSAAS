export default function NorthCompass() {
    return (
      <div
        className="
          absolute
          top-5
          right-5
          z-[1000]
          w-36
          h-36
          rounded-3xl
          border
          border-white/30
          bg-white/15
          backdrop-blur-md
          shadow-2xl
          flex
          items-center
          justify-center
        "
      >
        {/* Vertical line */}
        <div className="absolute h-20 w-[3px] rounded-full bg-white" />
  
        {/* Horizontal line */}
        <div className="absolute h-[3px] w-20 rounded-full bg-white" />
  
        {/* Center circle */}
        <div className="absolute h-5 w-5 rounded-full border-2 border-white bg-white shadow-lg" />
  
        {/* Outer ring */}
        <div className="absolute h-24 w-24 rounded-full border border-white/40" />
  
        {/* North */}
        <div className="absolute top-3 flex flex-col items-center">
          <span className="text-red-500 text-2xl font-black">N</span>
          <span className="-mt-2 text-red-500 text-xl">▲</span>
        </div>
  
        {/* South */}
        <span className="absolute bottom-3 text-white text-2xl font-bold">
          S
        </span>
  
        {/* East */}
        <span className="absolute right-3 text-white text-2xl font-bold">
          E
        </span>
  
        {/* West */}
        <span className="absolute left-3 text-white text-2xl font-bold">
          W
        </span>
      </div>
    );
  }