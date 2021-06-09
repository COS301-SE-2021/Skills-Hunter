using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            //Database.EnsureCreated();
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<ProjectSkill> ProjectSkills { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<WorkExperience> WorkExperiences { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().ToTable("Project");
            modelBuilder.Entity<Project>().HasKey("ProjectId");

            modelBuilder.Entity<Project>().ToTable("User");
            modelBuilder.Entity<Project>().HasKey("UserId");

            modelBuilder.Entity<Project>().ToTable("Category");
            modelBuilder.Entity<Project>().HasKey("CategoryId");

            modelBuilder.Entity<Project>().ToTable("Skill");
            modelBuilder.Entity<Project>().HasKey("SkillId");

            modelBuilder.Entity<Project>().ToTable("ProjectSkill");
            modelBuilder.Entity<Project>().HasKey("ProjectSkillId");

            modelBuilder.Entity<Project>().ToTable("UserSkill");
            modelBuilder.Entity<Project>().HasKey("UserSkillId");

            modelBuilder.Entity<Project>().ToTable("WorkExperience");
            modelBuilder.Entity<Project>().HasKey("WorkExperienceId");


        }

    }
}
