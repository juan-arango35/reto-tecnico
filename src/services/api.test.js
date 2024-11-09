import { describe, it, expect } from "vitest";
import { mockLogin } from "./api";

describe("mockLogin", () => {
  it("debería resolver con datos de usuario válidos para credenciales correctas", async () => {
    const result = await mockLogin("admin@email.com", "supersecret");
    expect(result).toEqual({
      ok: true,
      data: {
        email: "admin@email.com",
        mane: "Sr. Admin",
        role: "admin",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      },
    });
  });

  it("debería rechazar con un error para credenciales incorrectas", async () => {
    await expect(mockLogin("wrong@email.com", "wrongpassword")).rejects.toThrow(
      "Credenciales invalidas"
    );
  });

  it("debería rechazar con un error para email correcto pero contraseña incorrecta", async () => {
    await expect(mockLogin("admin@email.com", "wrongpassword")).rejects.toThrow(
      "Credenciales invalidas"
    );
  });

  it("debería rechazar con un error para email incorrecto pero contraseña correcta", async () => {
    await expect(mockLogin("wrong@email.com", "supersecret")).rejects.toThrow(
      "Credenciales invalidas"
    );
  });

  it("debería resolver en aproximadamente 1 segundo", async () => {
    const start = Date.now();
    await mockLogin("admin@email.com", "supersecret");
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeGreaterThanOrEqual(950);
    expect(duration).toBeLessThanOrEqual(1050);
  });

  it("debería rechazar en aproximadamente 1 segundo para credenciales incorrectas", async () => {
    const start = Date.now();
    await expect(
      mockLogin("wrong@email.com", "wrongpassword")
    ).rejects.toThrow();
    const end = Date.now();
    const duration = end - start;
    expect(duration).toBeGreaterThanOrEqual(950);
    expect(duration).toBeLessThanOrEqual(1050);
  });

  it("debería manejar múltiples llamadas concurrentes", async () => {
    const promises = [
      mockLogin("admin@email.com", "supersecret"),
      mockLogin("wrong@email.com", "wrongpassword"),
      mockLogin("admin@email.com", "supersecret"),
    ];
    const results = await Promise.allSettled(promises);
    expect(results[0].status).toBe("fulfilled");
    expect(results[1].status).toBe("rejected");
    expect(results[2].status).toBe("fulfilled");
  });

  it("debería manejar valores de entrada inesperados", async () => {
    await expect(mockLogin(null, null)).rejects.toThrow(
      "Credenciales invalidas"
    );
    await expect(mockLogin(undefined, undefined)).rejects.toThrow(
      "Credenciales invalidas"
    );
    await expect(mockLogin("", "")).rejects.toThrow("Credenciales invalidas");
  });

  it("debería ser case-sensitive para el email y la contraseña", async () => {
    await expect(mockLogin("ADMIN@email.com", "supersecret")).rejects.toThrow(
      "Credenciales invalidas"
    );
    await expect(mockLogin("admin@email.com", "SUPERSECRET")).rejects.toThrow(
      "Credenciales invalidas"
    );
  });

  it("debería manejar espacios en blanco en el email y la contraseña", async () => {
    await expect(
      mockLogin(" admin@email.com ", " supersecret ")
    ).rejects.toThrow("Credenciales invalidas");
  });
});
