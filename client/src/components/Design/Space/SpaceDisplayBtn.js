
function SpaceDisplayBtn({value, children}){
    return (
        <button className="btn d-flex align-items-center fw-bold border border-primary rounded-pill text-primary mx-1 mx-xl-2">
            <span>
                {children}
            </span>
            <span className="ms-1">
                {value}
            </span>
        </button>
    )
}

export default SpaceDisplayBtn;