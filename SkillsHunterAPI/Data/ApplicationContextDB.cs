using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models
{
    public class ApplicationContextDB: DbContext
    {
        public ApplicationContextDB(DbContextOptions<ApplicationContextDB> options): base(options)
        {
            //Database.EnsureCreated();
        }

        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Project>().ToTable("Project");
            modelBuilder.Entity<Project>().HasKey("ProjectId");
        }

    }
}
