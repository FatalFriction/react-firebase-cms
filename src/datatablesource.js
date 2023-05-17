  export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
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
      field: "address",
      headerName: "Address",
      width: 250,
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
  

  
