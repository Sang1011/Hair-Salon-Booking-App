import BookingDetailContent from '../../components/BookingDetailContent';
import "./style.css";
function BookingDetail(){
    return (
        <>
            <div className="booking-content" style={{paddingTop: '40px'}}>
                <BookingDetailContent />
            </div>
        </>
    )
}
export default BookingDetail;