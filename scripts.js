function Popup(d) {
  Swal.fire({text: d,});
}
function print(p){
	console.log(p);
}
function Input(b, c, registration){
	var description = "";
	var approval = "";

	Swal.fire({
		title: 'Enter Compliance Description',
		html: `<textarea style = "font-size:12pt; height:200px; width:300px" type="text" id="desc" class="swal2-input"></textarea>
		<input style = "font-size:10pt" type="text" id="approved" class="swal2-input" placeholder = "Approved By:">
		<input type = 'file' id = 'file' name = 'file'>
		`,
		confirmButtonText: 'Accept',
		showCancelButton: true,
		focusConfirm: false,

		
		preConfirm: () => {
			const desc = Swal.getPopup().querySelector('#desc').value
			const approved = Swal.getPopup().querySelector('#approved').value
			

			if(!desc || !approved){
				Swal.showValidationMessage('Please fill in all required fields')
			}
			return { desc: desc, approved: approved}
		}

		}).then((result) => {
			
			
			description = result.value.desc
			approval = result.value.approved
			
		}).then((result) => {
			var formData = new FormData();
			formData.append('file', $('#file').val());
			console.log(formData.has('file'));
			Swal.fire({
					icon: 'success',
					title: 'Saved!',
				})
			$.ajax({
				url:"query.php",    
				type: "post",    
				data: {registration: registration, desc: description, app: approval, b:b, c:c},
				success(){
					console.log('ya');
					$.ajax({
						url:"upload.php",    
						type: "post",   
						enctype: "multipart/form-data",
						processData: false,
						contentType: false,
						data: formData,
						sucess(d){

							console.log(d);
						}
					});
				}
			});
			
		});

			
}
