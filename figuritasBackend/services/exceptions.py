class ServiceError(Exception):
    """Error base lanzado por la capa de servicios."""


class NotFound(ServiceError):
    pass


class DuplicateEmail(ServiceError):
    pass


class InvalidCredentials(ServiceError):
    pass


class ValidationError(ServiceError):
    pass
