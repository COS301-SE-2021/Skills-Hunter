using System;
using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Models;

namespace SkillsHunterAPI.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        //Sets for the migrations to be created
        //e.g public DbSet<User> Users { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<UserType> UserTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey("UserId");
            modelBuilder.Entity<UserType>().HasKey("Id");
            base.OnModelCreating(modelBuilder);
        }
    }
}
