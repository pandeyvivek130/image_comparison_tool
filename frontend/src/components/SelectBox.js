
import React from 'react';

export default function SelectBox(props) {

  const { img_set, value, onChange, id } = props;

  const handleChange = (e) => {
    const text = e.target.value;
    onChange(id, text, img_set.name);
  }
  return (
    <div className="form-group">
      <label htmlFor="select1" ></label>
      <select name={img_set._id} value={value} onChange={handleChange} className="form-control">
        <option value={img_set.result}>Select an Option</option>
        <option value="UNKNOWN">UNKNOWN</option>
        <option value="MATCH">MATCH</option>
        <option value="DIFFER">DIFFER</option>
      </select>
    </div>
  )
}
