using Microsoft.AspNetCore.Mvc;
using BusTicketBookingAPI.Models;
using System.Collections.Generic;

[ApiController]

[Route ("api/[controller]")]

public class  : ControllerBase
{
    private static List <User> users = new List<User> ();

    [HttpPost("register")]
    public IActionResult Register([FromBody] User user)
    {
        if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
        {
            return BadRequest ("Invalid user data.");
        }

        user.Id = users.Count + 1;
        users.Add(user);

        return Ok(new { message = "User registered succesfully!" });
    }
}
