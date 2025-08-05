const CheckBox = ({
    onChange,
    value
}) => {
  return (
    <div className="checkbox-wrapper-41">
        <input type="checkbox" value={value} onChange={onChange}/>
    </div>
  )
}

export default CheckBox