import "./Jurnalitem.css";

function JurnalItem({title, post, date }) {
const formatedDate = new Intl.DateTimeFormat("ru-RU").format(date);

    return (
        <>
            <h2 className="jurnal-item__header">{title}</h2>
            <h2 className="jurnal-item__body">
                <div className="jurnal-item__date">{formatedDate}</div> {/*мы не можем выводить Обект!!*/}
                <div className="jurnal-item__text">{post}</div>
            </h2>
        </>
    );
}
export default JurnalItem;