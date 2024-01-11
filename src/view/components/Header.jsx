const Header = ({prefix,suffix,title}) => {
    return <div className="border-b text-white p-4 sticky top-0 z-10">
        {prefix}
        <h2 className="text-xl font-bold text-center text-gray-500">{title}</h2>
        {suffix}
    </div>
}

export default Header