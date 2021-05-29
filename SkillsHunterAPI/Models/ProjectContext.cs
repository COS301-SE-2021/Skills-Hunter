using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models
{
    public class ProjectContext: DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options): base(options)
        {
            //Database.EnsureCreated();
        }

        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<User>().HasKey("UserId");
            //modelBuilder.Entity<Project>().HasKey("Id");
            modelBuilder.Entity<Project>().ToTable("Project");
            //base.OnModelCreating(modelBuilder);
        }

    }
}
