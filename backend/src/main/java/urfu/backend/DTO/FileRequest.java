package urfu.backend.DTO;

public record FileRequest(byte[] data, String filename, String contentType) {
}
