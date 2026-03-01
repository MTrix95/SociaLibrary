package it.socialibrary.administratorservice.exceptions;

public class AdministratorException extends RuntimeException {
    public AdministratorException() {
        super();
    }

    public AdministratorException(String message) {
        super(message);
    }

    public AdministratorException(String message, Throwable cause) {
        super(message, cause);
    }

    public AdministratorException(Throwable cause) {
        super(cause);
    }
}
