import z from "zod";

export const RegisterBody = z
  .object({
    name: z
      .string({
        required_error: "Tên không được để trống",
        invalid_type_error: "Tên phải là chuỗi",
      })
      .trim()
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(256, "Tên không được vượt quá 256 ký tự"),
    email: z
      .string({
        required_error: "Email không được để trống",
        invalid_type_error: "Email phải là chuỗi",
      })
      .email("Email không đúng định dạng"),
    password: z
      .string({
        required_error: "Mật khẩu không được để trống",
        invalid_type_error: "Mật khẩu phải là chuỗi",
      })
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Mật khẩu không được vượt quá 100 ký tự"),
    confirmPassword: z
      .string({
        required_error: "Xác nhận mật khẩu không được để trống",
        invalid_type_error: "Xác nhận mật khẩu phải là chuỗi",
      })
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Xác nhận mật khẩu không được vượt quá 100 ký tự"),
  })
  .strict("Dữ liệu không hợp lệ")
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu xác nhận không khớp với mật khẩu",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    email: z
      .string({
        required_error: "Email không được để trống",
        invalid_type_error: "Email phải là chuỗi",
      })
      .email("Email không đúng định dạng"),
    password: z
      .string({
        required_error: "Mật khẩu không được để trống",
        invalid_type_error: "Mật khẩu phải là chuỗi",
      })
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Mật khẩu không được vượt quá 100 ký tự"),
  })
  .strict("Dữ liệu không hợp lệ");

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
