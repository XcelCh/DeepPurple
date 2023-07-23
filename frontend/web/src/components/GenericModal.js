import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const GenericModal = ({
  cardTitle,
  fieldName,
  placeholderContent,
  buttonContent,
  id,
}) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box p-0 rounded-lg w-fit">
          {/* Title */}
          <div className="grid grid-cols-2 bg-[#9554FE] p-5">
            <p className="font-bold text-xl text-[#FFFFFF]">{cardTitle}</p>
            <div className="modal-action m-0">
              <label htmlFor={id}>
                <CloseIcon
                  style={{ fill: "#FFFFFF" }}
                  className="place-self-end"
                />
              </label>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mx-auto">
              <p className="mb-2">{fieldName}</p>
              <input
                type="text"
                name="phoneNum"
                id="phoneNum"
                className="mb-7 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block p-2.5 outline-none border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-72 duration-200 peer focus:border-indigo-60 bg-white"
                // value={phoneNum}
                // onChange={(e) => setPhoneNum(e.target.value)}
                placeholder={placeholderContent}
                required
              ></input>
            </div>
            <div className="flex justify-end">
              <button
                className="btn btn-sm bg-[#9554FE] normal-case h-11 px-5 border-[#9554FE]"
                // onClick={handleNext}
              >
                {buttonContent}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericModal;
