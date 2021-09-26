using Microsoft.EntityFrameworkCore;
using SkillsHunterAPI.Models;
using SkillsHunterAPI.Models.Project;
using SkillsHunterAPI.Models.User;
using SkillsHunterAPI.Models.Skill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SkillsHunterAPI.Models.Skill.Entity;
using SkillsHunterAPI.Models.User.Entity;
using SkillsHunterAPI.Models.Notification;

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
        public DbSet<ExternalWorkExperience> ExternalWorkExperiences { get; set; }
        public DbSet<InternalWorkExperience> InternalWorkExperiences { get; set; }

        public DbSet<Application> Applications { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<SkillCollection> SkillCollections { get; set; }
        public DbSet<SkillCollectionMap> SkillCollectionMaps { get; set; }
        public DbSet<ProjectSkillCollection> ProjectSkillCollections { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<SkillCategory> SkillCategories { get; set; }
        public DbSet<UserSkillCollection> UserSkillCollections { get; set; }

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<EducationalBackground> EducationalBackgrounds { get; set; }

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

            modelBuilder.Entity<ExternalWorkExperience>().ToTable("ExternalWorkExperience");
            modelBuilder.Entity<ExternalWorkExperience>().HasKey("ExternalWorkExperienceId");

            modelBuilder.Entity<InternalWorkExperience>().ToTable("InternalWorkExperience");
            modelBuilder.Entity<InternalWorkExperience>().HasKey("InternalWorkExperienceId");

            modelBuilder.Entity<Application>().ToTable("Application");
            modelBuilder.Entity<Application>().HasKey("ApplicationId");
            
            modelBuilder.Entity<Invitation>().ToTable("Invitation");
            modelBuilder.Entity<Invitation>().HasKey("InvitationId");

            modelBuilder.Entity<SkillCollection>().ToTable("SkillCollection");
            modelBuilder.Entity<SkillCollection>().HasKey("SkillCollectionId");


            modelBuilder.Entity<SkillCollectionMap>().ToTable("SkillCollectionMap");
            modelBuilder.Entity<SkillCollectionMap>().HasKey("SkillCollectionMapId");

            modelBuilder.Entity<ProjectSkillCollection>().ToTable("ProjectSkillCollection");
            modelBuilder.Entity<ProjectSkillCollection>().HasKey("ProjectSkillCollectionId");
        
            modelBuilder.Entity<Image>().ToTable("Image");
            modelBuilder.Entity<Image>().HasKey("ImageId");

            modelBuilder.Entity<SkillCategory>().ToTable("SkillCategory");
            modelBuilder.Entity<SkillCategory>().HasKey("SkillCategoryId");

            modelBuilder.Entity<UserSkillCollection>().ToTable("UserSkillCollection");
            modelBuilder.Entity<UserSkillCollection>().HasKey("UserSkillCollectionId");

            modelBuilder.Entity<Notification>().ToTable("Notification");
            modelBuilder.Entity<Notification>().HasKey("NotificationId");

            modelBuilder.Entity<EducationalBackground>().ToTable("EducationalBackground");
            modelBuilder.Entity<EducationalBackground>().HasKey("EducationalBackgroundId");

        }

    }
}
