﻿using System;
namespace SkillsHunterAPI.Models.Project.Entity
{
    public class MatchingSkill
    {
        public Guid SkillId { get; set; }
        public String Name { get; set; }
        public int Weight { get; set; }
        public double Percentage { get; set; }
        public double YearsOfExperience { get; set; } = 0.0;

        public MatchingSkill()
        {
        }
    }
}