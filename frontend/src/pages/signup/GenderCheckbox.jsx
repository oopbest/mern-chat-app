import React from "react";

const GenderCheckbox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            value="male"
            checked={selectedGender === "male"}
            onChange={onCheckBoxChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            value="female"
            checked={selectedGender === "female"}
            onChange={onCheckBoxChange}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
