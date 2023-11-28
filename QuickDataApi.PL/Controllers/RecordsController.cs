using Microsoft.AspNetCore.Mvc;
namespace QuickDataApi.PL.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecordsController : ControllerBase
{
    private readonly IRecordRepo _recordRepo;
    public RecordsController(IRecordRepo recordRepo)
    {
        _recordRepo = recordRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetRecords()
    {
        return Ok(await _recordRepo.GetAll());
    }

    [HttpPost]
    public async Task<IActionResult> AddRecord([FromBody] Record record)
    {
        record.Id = 0;
        await _recordRepo.Add(record);
        return Created();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecord(int id)
    {
        try
        {
            var record = await _recordRepo.GetById(id);
            if (record == null)
            {
                return NotFound();
            }
            await _recordRepo.Delete(record);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}
