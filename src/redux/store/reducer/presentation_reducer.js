const GET_PRESENTATION = "GET-PRESENTATION";
const GET_PRESENTATION_SUCCESS = "GET-PRESENTATION-SUCCESS";
const GET_PRESENTATION_ERROR = "GET-PRESENTATION-ERROR";

const initialState = {
    Presentation:[
        {id:1, private: false, formatFile:"PDF",presentationName:"wakia",presentationDate:"Apr 9",presentationSize:"460 KB", presentationImg:"https://freesoft.ru/storage/images/news/1/6/556/556_text.png"},
        {id:2, private: false,formatFile:"PDF",presentationName:"wakia uarel rrnjmjhkjhkhgsdju",presentationSize:"460 KB",presentationDate:"Apr 3",presentationImg:"https://beginpc.ru/images/windows/file.jpg"},
        {id:3, private: true,formatFile:"PNG",presentationName:"del;ivria Ul 1221212132 lock ewsiminch em are",presentationSize:"560 KB",presentationDate:"Apr 4", presentationImg:"https://usersos.ru/wp-content/uploads/2019/12/kak-otkryt-prochitat-raspechatat-fajly-djvu.jpg"},
        {id:4, private: false,formatFile:"PDF",presentationName:"Ambika Venogopall _CV",presentationSize:"460 KB",presentationDate:"Apr 11", presentationImg:"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_178f9c454ba%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_178f9c454ba%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"},
        {id:5, private: false,formatFile:"PDF",presentationName:"ibraimDevbelopment App jan",presentationSize:"360 KB",presentationDate:"Apr 4", presentationImg:"https://beginpc.ru/images/windows/file.jpg"},
        {id:6, private: true,formatFile:"img",presentationName:"ibraimedevelopment kljhoklhkl",presentationSize:"460 KB",presentationDate:"Apr 3", presentationImg:"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_178f9c454b9%20text%20%7B%20fill%3A%236f42c1%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_178f9c454b9%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%236f42c1%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"},
        {id:7, private: false,formatFile:"PDF",presentationName:"Grigr fermer minning",presentationSize:"460 KB",presentationDate:"Apr 9", presentationImg:"https://www.iguides.ru/upload/iblock/67b/67bbb26bac9f3f1d19f78bcc4a369996.jpg"},
        {id:8, private: false,formatFile:"PDF",presentationName:" ????????????",presentationSize:"460 KB",presentationDate:"Apr 5", presentationImg:"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_178f9c454b8%20text%20%7B%20fill%3A%23e83e8c%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_178f9c454b8%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23e83e8c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"},
    ],
    loading:false,
    error:null

}


const presentationReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_PRESENTATION:
            return {
                ...state,
                loading:true, error:null,users:[]};
        case GET_PRESENTATION_SUCCESS:
            return {
                ...state,
                loading:false, error:null,users:action.payload};
        case GET_PRESENTATION_ERROR:
            return {
                ...state,
                loading:false, error:action.payload, users:[]};
        default:return state
    }
}

export default presentationReducer;

