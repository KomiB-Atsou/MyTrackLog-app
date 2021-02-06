
import Swal from 'sweetalert2';

export const swalCategory = (label, parentCategoryLabel, callback) => {
    Swal.fire({
        title: label.length > 0 ? 'Update category' : 'Create category',
        html: `<input id="txt-label" class="swal2-input" placeholder="Category label..." value="${label}" />`,
        showCancelButton: true,
        confirmButtonText: label.length > 0 ? 'Update' : 'Create',
        showLoaderOnConfirm: true,
        footer: parentCategoryLabel.length > 0 ? `<span>You are creating a new category under <strong>${parentCategoryLabel}</strong></span>` : ``,
        preConfirm: () => {
            const text = document.getElementById('txt-label').value;
            if (!text || text.length === 0)
                return Swal.showValidationMessage(`Please provide category label.`);
        },
    }).then(result => {
        if(result.value) {
            const label = document.getElementById('txt-label').value;
            callback(label);
        }
    });
}

export const swalDeleteForm = callback => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        if (result.value) {
            callback();
        }
    });
}

export const swalDeleteCategory = callback => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        footer: `<strong>Warning!</strong>&nbsp;This Category, all its Sub-Categories and the Tasks in these categories will be deleted!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        if (result.value) {
            callback();
        }
    });
}

export const swalError = message => {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: true
    });
}

export const swalSuccess = message => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 800
    });
}

export const swalInfo = message => {
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: message,
        showConfirmButton: true
    });
}

export const swalLoading = () => {
    Swal.fire({
        title: 'Loading...',
        text: "Please wait.",
        timerProgressBar: true,
        showConfirmButton: false,
        showCancelButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });
}