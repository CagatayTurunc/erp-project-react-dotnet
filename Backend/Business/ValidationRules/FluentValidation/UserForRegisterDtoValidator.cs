using Entities.DTOs;
using FluentValidation;
using System.Linq;

namespace Business.ValidationRules.FluentValidation
{
    public class UserForRegisterDtoValidator : AbstractValidator<UserForRegisterDto>
    {
        public UserForRegisterDtoValidator()
        {
            // Kural 1: E-posta formatı kontrolü
            RuleFor(u => u.Email)
                .NotEmpty().WithMessage("E-posta adresi boş olamaz.")
                .EmailAddress().WithMessage("Lütfen geçerli bir e-posta adresi girin.");

            // Kural 2: Şifre uzunluğu kontrolü
            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("Şifre boş olamaz.")
                .MinimumLength(6).WithMessage("Şifreniz en az 6 karakter uzunluğunda olmalıdır.");

            // Kural 3: İsimde rakam olmaması kontrolü
            RuleFor(u => u.FirstName)
                .NotEmpty().WithMessage("İsim boş olamaz.")
                .Must(BeAllLetters).WithMessage("İsim sadece harflerden oluşmalıdır.");

            // Kural 3: Soyisimde rakam olmaması kontrolü
            RuleFor(u => u.LastName)
                .NotEmpty().WithMessage("Soyisim boş olamaz.")
                .Must(BeAllLetters).WithMessage("Soyisim sadece harflerden oluşmalıdır.");
        }

        // İsim ve soyismin sadece harf içerip içermediğini kontrol eden yardımcı metot
        private bool BeAllLetters(string arg)
        {
            // Eğer string boşsa veya null ise, 'NotEmpty' kuralı zaten bunu yakalar.
            // Bu yüzden burada sadece harf kontrolü yapmamız yeterli.
            if (string.IsNullOrEmpty(arg)) return true;
            return arg.All(char.IsLetter);
        }
    }
}