import React from "react";
import {useNavigate} from "react-router-dom";

function AppsTableItem(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/apps/${props.id}`);
  };

  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700/30">
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={props.id}
              className="form-checkbox"
              type="checkbox"
              onChange={props.handleSelect}
              checked={props.isChecked}
            />
          </label>
        </div>
      </td>

      <td
        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
        onClick={handleClick}
      >
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {props.name}
        </div>
      </td>
      <td
        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="w-6 h-auto shrink-0 mr-2 sm:mr-3">
            <img
              src="/icons/building-warehouse.svg"
              //   src={`/icons/${props.icon}`}
              width="30"
              height="30"
              alt={props.name}
              className="brightness-0 opacity-80 dark:invert dark:brightness-0 dark:opacity-50"
            />
          </div>
        </div>
      </td>
      <td
        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-left">{props.url}</div>
      </td>
      <td
        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-left">{props.category}</div>
      </td>
      <td
        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-left">{props.description}</div>
      </td>
    </tr>
  );
}

export default AppsTableItem;
