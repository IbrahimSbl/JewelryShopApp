using System.ComponentModel.DataAnnotations;

namespace JewelryShopApp.Models
{
    public class Category
    {
        [Key]
        public int id { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "Exceeded max length which is 20 character")]
        public string name { get; set; }

        public string categoryPicture { get; set; }
        public List<JewelryItem>? jewelryItems { get; set; }
    }
}