const Header = ({prefix,suffix,title}) => {
    return <div className="flex justify-center border-b text-white p-4 sticky top-0 z-10 h-[5vh]">
        {prefix}
        <h2 className="text-xl font-bold text-center text-gray-500">{title}</h2>
        {suffix}
    </div>
}

export default Header