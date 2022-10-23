import swal from "sweetalert";

export const handleConfirm = (cb) => {
  return (...args) => {
    swal({
      title: "Warning",
      text: "Are you sure to delete?",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then((isDeleted) => {
      if (isDeleted) {
        cb(...args);
      }
    });
  };
};
