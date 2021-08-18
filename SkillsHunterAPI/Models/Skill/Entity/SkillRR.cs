﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsHunterAPI.Models
{
    public class SkillRR
    {
        public Guid SkillId { get; set; }
        public String SkillName { get; set; }

        public SkillRR() { }
        public SkillRR(Guid skillId, string skillName)
        {
            SkillId = skillId;
            SkillName = skillName;
        }
    }
}
