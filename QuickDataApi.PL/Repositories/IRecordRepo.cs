namespace QuickDataApi.PL;

public interface IRecordRepo
{
    Task<IEnumerable<Record>> GetAll();
    Task<Record?> GetById(int recordId);
    Task Add(Record record);
    Task Delete(Record record);
}
