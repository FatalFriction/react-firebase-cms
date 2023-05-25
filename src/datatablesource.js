  export const userColumns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "displayName",
      headerName: "User Name",
      width: 250,
    },
    {
      field: "timeStamp",
      headerName: "Created At",
      width: 150,
    },
  ];

  export const productsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="products" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
    },
    {
      field: "category",
      headerName: "Category",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.category}`}>
            {params.row.category}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.price}`}>
            {params.row.price}
          </div>
        );
      },
    },
    {
      field: "size",
      headerName: "Size",
      width: 80,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.size}`}>
            {params.row.size}
          </div>
        );
      },
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.availability}`}>
            {params.row.availability}
          </div>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.brand}`}>
            {params.row.brand}
          </div>
        );
      },
    },
    {
      field: "authenticity",
      headerName: "Authenticity",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.authenticity}`}>
            {params.row.authenticity}
          </div>
        );
      },
    },
  ];
  
  export const ordersColumns = [
    { field: "id", headerName: "Order ID", width: 100 },
    {
      field: "userName",
      headerName: "Customer Name",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
          <img className="cellImg" src={params.row.userPhotoURL} alt="customer" />
            {params.row.userName}
          </div>
        );
      },
    },
    {
      field: "timeStamp",
      headerName: "Order Created",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.timeStamp}`}>
            {params.row.timeStamp}
          </div>
        );
      },
    },
    {
      field: "userAddress",
      headerName: "Customer Address",
      width: 300,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.userAddress}`}>
            {params.row.userAddress}
          </div>
        );
      },
    },
    {
      field: "useremail",
      headerName: "Customer E-mail",
      width: 250,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.useremail}`}>
            {params.row.useremail}
          </div>
        );
      },
    },
    {
      field: "totalCart",
      headerName: "Total Payment Order",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.totalCart}`}>
            {params.row.totalCart.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
          </div>
        );
      },
    },
  ];
  

  
