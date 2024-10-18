
const Loading = () => {
  return (
    <div className="w-full flex justify-center">
      <svg
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="50px"
        height="50px"
      >
        <path
          fill="#A2845E"
          d="M50 10a40 40 0 1 0 40 40 5 5 0 0 0-10 0 30 30 0 1 1 -30-30 5 5 0 0 0 0-10Z"
          transform="rotate(180 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default Loading;
