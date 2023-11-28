using Microsoft.EntityFrameworkCore;

namespace QuickDataApi.PL;

public class RecordRepo(DBContext context) : IRecordRepo
{
    private readonly DBContext _context =context ;
    public async Task<IEnumerable<Record>> GetAll()
    {
        return await _context.Records.AsNoTracking().ToListAsync();
    }
    public async Task<Record?> GetById(int recordId)
    {
        return await _context.Records.FindAsync(recordId);
    }
    public async Task Add(Record record)
    {
        if (record != null)
        {
            _context.Records.Add(record);
            await _context.SaveChangesAsync();
        }
    }
    public async Task Delete(Record record)
    {
        _context.Records.Remove(record);
        await _context.SaveChangesAsync();
    }
}
