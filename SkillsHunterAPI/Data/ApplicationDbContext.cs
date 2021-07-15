﻿using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.User;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

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
        public DbSet<Application> Applications { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<SkillCollection> SKillCollections { get; set; }
        public DbSet<SkillCollectionMap> SKillCollectionMap { get; set; }
        public DbSet<Invitation> Invitations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().ToTable("Project");
            modelBuilder.Entity<Project>().HasKey("ProjectId");

            modelBuilder.Entity<User>().ToTable("Account");
            modelBuilder.Entity<User>().HasKey("UserId");

            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<Category>().HasKey("CategoryId");

            modelBuilder.Entity<Skill>().ToTable("Skill");
            modelBuilder.Entity<Skill>().HasKey("SkillId");

            modelBuilder.Entity<ProjectSkill>().ToTable("ProjectSkill");
            modelBuilder.Entity<ProjectSkill>().HasKey("ProjectSkillId");

            modelBuilder.Entity<UserSkill>().ToTable("UserSkill");
            modelBuilder.Entity<UserSkill>().HasKey("UserSkillId");

            modelBuilder.Entity<WorkExperience>().ToTable("WorkExperience");
            modelBuilder.Entity<WorkExperience>().HasKey("WorkExperienceId");

            modelBuilder.Entity<Application>().ToTable("Application");
            modelBuilder.Entity<Application>().HasKey("ApplicationId");
            
            modelBuilder.Entity<Invitation>().ToTable("Invitation");
            modelBuilder.Entity<Invitation>().HasKey("InvitationId");

            modelBuilder.Entity<SkillCollection>().ToTable("SkillCollection");
            modelBuilder.Entity<SkillCollection>().HasKey("SKillCollectionId");

            modelBuilder.Entity<SkillCollectionMap>().ToTable("SKillCollectionMap");
            modelBuilder.Entity<SkillCollectionMap>().HasKey("SkillCollectionMapId");
        
            modelBuilder.Entity<Image>().ToTable("Image");
            modelBuilder.Entity<Image>().HasKey("ImageId");        
        }

    }
}
